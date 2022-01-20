class Web::PasswordResetsController < Web::ApplicationController
  def new
    @password_reset = PasswordResetForm.new
  end

  def create
    @password_reset = PasswordResetForm.new(password_reset_params)
    @email = @password_reset.email

    if @password_reset.valid?
      @user = @password_reset.user
      UserService.reset_password!(@user)
    end

    redirect_to(root_path)
  end

  def edit
    set_user
  end

  def update
    set_user

    if @user.update(user_params)
      UserService.clear_reset_digest(@user)
    end

    redirect_to(new_session_path)
  end

  private

  def set_user
    @user = User.find_by(reset_digest: params[:user][:reset_digest])
    if @user.blank? || !UserService.password_reset_period_valid?(@user)
      redirect_to(new_session_path)
    end
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def password_reset_params
    params.require(:password_reset_form).permit(:email)
  end
end
