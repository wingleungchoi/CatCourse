class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_user_language

  private
  def set_user_language
    session[:lang] ? I18n.locale = session[:lang] : I18n.locale = "en"
  end
end
