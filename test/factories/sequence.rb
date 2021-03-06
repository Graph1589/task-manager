FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :name, :description, :state] do |n|
    "string#{n}"
  end
  sequence :email do |n|
    "person#{n}@example.com"
  end
  sequence :avatar do |n|
    "path/avatar-#{n}"
  end
  sequence :expired_at do |n|
    Time.now.to_date + n.days
  end
end
