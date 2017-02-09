require 'active_record'

class Item < ActiveRecord::Base
  validates :foodcart_id, numericality: { only_integer: true }, presence: true
  validates :vegetarian, inclusion: { in: [true, false] }
  belongs_to :foodcart
end
