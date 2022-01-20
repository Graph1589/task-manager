# frozen_string_literal: true

require 'test_helper'

class Web::PasswordResetsControllerTest < ActionController::TestCase
  test 'new' do
    get :new
    assert_response :success
  end

  test 'create' do
    user = create(:user)
    token_before_reset = user.reset_digest

    post :create, params: { password_reset_form: { email: user.email } }
    assert_response :redirect

    user.reload
    assert token_before_reset != user.reset_digest
  end

  test 'edit' do
    user = create(:user)
    UserService.reset_password!(user)
    token = user.reset_digest

    get :edit, params: { user: { reset_digest: token, email: user.email } }
    assert_response :success
  end

  test 'update' do
    user = create(:user)
    UserService.reset_password!(user)

    new_password = generate(:string)

    attrs = {
      password: new_password,
      password_confirmation: new_password,
    }

    patch :update, params: { user: { reset_digest: user.reset_digest, email: user.email, user: attrs } }
    assert_response :redirect
    user.reload
    assert user.reset_digest.nil?
    assert user.reset_sent_at.nil?
  end
end
