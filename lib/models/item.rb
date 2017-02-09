require 'active_record'

class Item < ActiveRecord::Base
  validates :foodcart_id, numericality: { only_integer: true }, presence: true
  validates :vegetarian, exclusion: { in: [true, false] }, presence: true
  belongs_to :foodcart
end
