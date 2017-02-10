# Dir["lib/resources/*.rb"].each { |file| require file }
require_relative 'lib/resources/api'
require 'sinatra'

run Sinatra::Application
