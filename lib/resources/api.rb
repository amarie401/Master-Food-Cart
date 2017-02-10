require 'sinatra'
require 'active_record'
require 'yaml'
require_relative '../models/foodcart'
require_relative '../models/item'
require_relative '../models/rating'
require 'pry'

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

# get '/api'
