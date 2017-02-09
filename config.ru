Dir["lib/resources/*.rb"].each { |file| require file }

run Sinatra::Application
