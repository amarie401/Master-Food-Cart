# Dir["lib/resources/*.rb"].each { |file| require file }
require_relative 'lib/resources/api'
require 'sinatra'

set :public_folder, 'public'
run Sinatra::Application
