class User < ActiveRecord::Base
  before_validation :downcase_email
  validates :name, presence: true
  #validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i


  def payurl_url(return_url)
    values = {
      :business => 'wingleungchoi-facilitator@gmail.com',
      :cmd => "_xclick",
      :return => return_url,
      :amount => "1",
      :item_name => "cat_training_course",
      :item_number => "001",
      :quantity => "1",
    }
    "https://www.sandbox.paypal.com/cgi-bin/webscr?"+values.map{|k,v| "#{k}=#{v}"}.join("&")
  end

  private
  def downcase_email
    self.email = self.email.downcase if self.email.present?
  end
end