require 'active_record'

class Rating < ActiveRecord::Base
  validates :score, numericality: { only_integer: true }, presence: true
  belongs_to :foodcart
end
