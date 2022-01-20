class PasswordResetForm
  include ActiveModel::Model

  attr_accessor(
    :email,
  )

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :user_exists?

  def user
    @user = User.find_by(email: email)
  end

  def user_exists?
    errors.add(:email, :user_does_not_exist) if user.blank?
  end
end
