require 'sinatra'
require 'active_record'
require 'yaml'
require_relative '../models/foodcart'
require_relative '../models/item'
require_relative '../models/rating'
require 'pry'
require 'sinatra/json'
require_relative 'sinatra_json'

database_config = ENV['DATABASE_URL']

if database_config.blank?
  database_config = YAML::load(File.open('config/database.yml'))
end

ActiveRecord::Base.establish_connection(database_config)

after do
  ActiveRecord::Base.connection.close
end

post '/api/foodcart' do
  fc = Foodcart.new(name: params[:name], description: params[:description], image: params[:image] )
  if fc.valid?
    fc.save
    [201, fc.to_json]
  else
    halt 400
  end
end

post '/api/item' do
  i = Item.new(foodcart_id: params[:foodcart_id], food_name: params[:food_name], vegetarian: params[:vegetarian] )
  if i.valid?
    p i
    i.save
    [201, i.to_json]

  else
    halt 400
  end
end

post '/api/rating' do
  r = Rating.new(foodcart_id: params[:foodcart_id], score: params[:score], review: params[:review] )
  if r.valid?
    r.save
    [201, r.to_json]

  else
    halt 400
  end
end

get '/api/foodcarts/:id' do |id|
  foodcart = Foodcart.find_by_id(id)

  halt 404 if foodcart.nil?

  json foodcart
end

get '/api/foodcarts' do
  foodcarts = Foodcart.all.order(:name)

  query = params[:query]

  foodcarts = foodcarts.where("description ILIKE ? or name ILIKE ?", "%#{query}%", "%#{query}%") if query.present?

  json foodcarts
end

put '/api/rating/:id' do |id|
  rating = Rating.find_by_id(id)
  if rating.nil?
    [404, 'That rating does not exist']
  else
    rating.foodcart_id = params[:foodcart_id]
    rating.score = params[:score]
    rating.review = params[:review]
    rating.save
    [200, rating.to_json]
  end
end

delete '/api/rating/:id' do |id|
  rating = Rating.find_by_id(id)
  if !rating.nil?
    rating.destroy
  else
    [404, 'That rating does not exist']
  end
end
