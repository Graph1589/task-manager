FactoryBot.define do
  factory :task do
    name
    description
    author { create :user }
    assignee { create :user }
    state { :new_task }
    expired_at
  end
end
