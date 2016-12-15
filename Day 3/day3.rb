input = File.read(ARGV[0])
lines = input.lines

count = 0

lines.each do |e|
	sides = e.split(' ')
	if (Integer(sides[0])+Integer(sides[1]) > Integer(sides[2])) && (Integer(sides[2])+Integer(sides[1]) > Integer(sides[0])) && (Integer(sides[2])+Integer(sides[0]) > Integer(sides[1]))
		count += 1
	end
end

puts count
