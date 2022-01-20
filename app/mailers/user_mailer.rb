class UserMailer < ApplicationMailer
  default from: 'noreply@taskmanager.com'

  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New Task Created')
  end

  def task_updated
    @task = params[:task]
    author = @task.author

    mail(to: author.email, subject: 'Task Updated')
  end

  def task_destroyed
    @task = params[:task]
    author = @task.author

    mail(to: author.email, subject: 'Task Destroyed')
  end

  def reset_password
    @user = params[:user]

    mail(to: @user.email, subject: 'Reset Password')
  end
end
