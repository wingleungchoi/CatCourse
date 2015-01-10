class User < ActiveRecord::Base
  before_validation :downcase_email
  validates :name, presence: true
  #validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i


  private
  def downcase_email
    self.email = self.email.downcase if self.email.present?
  end
end