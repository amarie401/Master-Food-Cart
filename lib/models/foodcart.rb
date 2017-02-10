require 'active_record'
require 'json'
require_relative '../serializers/foodcart_serializer'

class Foodcart < ActiveRecord::Base
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true

  has_many :items
  has_many :ratings

  def average_rating
    self.ratings.average(:score)
  end

  def active_model_serializer
    FoodcartSerializer
  end
end
