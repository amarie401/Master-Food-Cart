require 'active_record'

class Foodcart < ActiveRecord::Base
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  has_many :items
  has_many :ratings
end
