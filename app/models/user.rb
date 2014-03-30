class User < ActiveRecord::Base

  # attr_accessor :password
  # attr_protected :password_digest

  # validates :name, :presence => true
  # validates :email, :presence => true, :uniqueness => true, :email => true
  # validates :password, :presence => true, :confirmation => true
  # validates :password_confirmation, :presence => { :if => :password }
  # validates :search_query, :presence => true
  # validates :phone, :format => { :allow_nil => true, :with => /^[()0-9- +.]{10,20}s*[extension.]{0,9}s*[0-9]{0,5}$/i }

  # def self.authenticate(email, pass)
  #   user = where(:email => email).first
  #   user && BCrypt::Password.new(user.password_digest) == pass ? user : nil
  # end

  # def password=(pass)
  #   return if pass.blank?
  #   @password = pass
  #   self.password_digest = BCrypt::Password.create(pass)
  # end

  def self.from_omniauth(auth)
    user = where(auth.slice("provider", "uid")).first || create_from_omniauth(auth)
    user.access_token = auth["credentials"]["token"]
    user.access_token_secret = auth["credentials"]["secret"]
    user.save!
    user
  end

  def self.create_from_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["nickname"]
      user.email = auth["info"]["nickname"]
      user.password_digest = auth["info"]["nickname"]
      # user.consumer_key = auth["extra"]["access_token"]["consumer"]["key"]
      # user.consumer_secret = auth["extra"]["access_token"]["consumer"]["secret"]
      # user.access_token = auth["extra"]["access_token"]["token"]
      # user.access_token_secret = auth["extra"]["access_token"]["secret"]
    end
  end

  def twitter
    if provider == "twitter"
      @twitter ||= Twitter::Client.new(access_token: access_token, access_token_secret: access_token_secret)
    end
  end

end