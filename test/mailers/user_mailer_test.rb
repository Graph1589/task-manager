require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  test 'task created' do
    user = create(:user)
    task = create(:task, author: user)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New Task Created', email.subject
    assert email.body.to_s.include?("Task #{task.id} was created")
  end

  test 'password reset created' do
    user = create(:user)
    token = SecureRandom.hex(10)
    user.update!(reset_digest: token, reset_sent_at: Time.current)

    email = UserMailer.with({ user: user }).reset_password

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Reset Password', email.subject
    assert email.body.to_s.include?(user.reset_digest.to_s)
  end
end
