input = File.read(ARGV[0])
lines = input.lines

count = 0
for i in 0..((lines.length/3) - 1)
	one = lines[3*i].split(' ')
	two = lines[3*i+1].split(' ')
	three = lines[3*i+2].split(' ')
	if (Integer(one[0])+Integer(two[0]) > Integer(three[0])) && (Integer(one[0])+Integer(three[0]) > Integer(two[0])) && (Integer(two[0])+Integer(three[0]) > Integer(one[0]))
		count += 1
	end
	if (Integer(one[1])+Integer(two[1]) > Integer(three[1])) && (Integer(one[1])+Integer(three[1]) > Integer(two[1])) && (Integer(two[1])+Integer(three[1]) > Integer(one[1]))
		count += 1
	end
	if (Integer(one[2])+Integer(two[2]) > Integer(three[2])) && (Integer(one[2])+Integer(three[2]) > Integer(two[2])) && (Integer(two[2])+Integer(three[2]) > Integer(one[2]))
		count += 1
	end
end

puts count
