class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
<<<<<<< Updated upstream
  
  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
=======

  validates :content, presence: true, unless: :image?
end
>>>>>>> Stashed changes
