input = File.read(ARGV[0])
lines = input.lines

# Pad with representation of each button and what button they go to depending on direction by order U,R,D,L. A-D represented by 10-13
pad = [[1,1,3,1],[2,3,6,2],[1,4,7,2],[4,4,8,3],[5,6,5,5],[2,7,10,5],[3,8,11,6],[4,9,12,7],[9,9,9,8],[6,11,10,10],[7,12,13,10],[8,12,12,11],[11,13,13,13]]
# String representation of pad buttons
answers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D']

ans = ''
# Start at number 5
index = 4
current = pad[index]

for i in 0..(lines.length-1) do
	while !lines[i].empty? do
		dir = lines[i].slice!(0)
		if dir == 'R'
			index = current[1]-1
			current = pad[index]
		elsif dir == 'L'
			index = current[3]-1
			current = pad[index]
		elsif dir == 'U'
			index = current[0]-1
			current = pad[index]
		elsif dir == 'D'
			index = current[2]-1
			current = pad[index]
		end
	end
	ans.concat(answers[index])
end

puts ans
