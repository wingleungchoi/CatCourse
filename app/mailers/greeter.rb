class Greeter < ActionMailer::Base
  default from: 'system@cattrainingcourse.com'

  def welcome_email(recipient)
      @recipient = recipient
      mail(to: recipient.email, subject: "[Signed up] Welcome #{recipient.name}")
  end
end