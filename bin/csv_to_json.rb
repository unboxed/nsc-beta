#!/usr/bin/env ruby

require 'csv'
require 'json'

filename = $ARGV.shift

puts CSV.open(filename, headers: true)
        .map(&:to_hash)
        .to_json
