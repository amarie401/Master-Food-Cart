require 'active_model_serializers'

class FoodcartSerializer < ActiveModel::Serializer
  self.root = false

  attributes :id, :name, :description, :image, :average_rating
  has_many :items
  has_many :ratings

  def average_rating
    object.average_rating.to_i
  end
end
