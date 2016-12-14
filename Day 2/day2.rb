input = File.read(ARGV[0])
lines = input.lines

index = 4
ans = ''

for i in 0..(lines.length-1) do
	while !lines[i].empty? do
		dir = lines[i].slice!(0)
		if dir == 'R'
			if index != 2 && index != 5 && index != 8
				index += 1
			end
		elsif dir == 'L'
			if index != 0 && index != 3 && index != 6
				index -= 1
			end
		elsif dir == 'U'
			if index != 0 && index != 1 && index != 2
				index -= 3
			end
		else
			if index != 6 && index != 7 && index != 8 && dir == 'D'
				index += 3
			end
		end
	end
	ans.concat(String(index+1))
end

puts ans
