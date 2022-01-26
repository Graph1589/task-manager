class UserService
  def self.reset_password!(user)
    token = SecureRandom.hex(10)
    user.update!(reset_digest: token, reset_sent_at: Time.current)

    SendPasswordResetNotificationJob.perform_async(user.id)
  end

  def self.password_reset_period_valid?(user)
    user.reset_sent_at.present? && (Time.current - user.reset_sent_at) <= 1.days
  end

  def self.clear_reset_digest(user)
    user.update!(reset_digest: nil, reset_sent_at: nil)
  end
end
