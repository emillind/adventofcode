# Read input file and split each movement into an array
input = File.read(ARGV[0])
array = input.split(', ')

# Positions in X and Y
x = 0
y = 0

# Facing direction in X and Y
xDir = 0
yDir = 1

# Walk the path
array.each do |e|
	direction = e.slice!(0)
	if direction.eql?('R')
		if xDir == 1
			xDir = 0
			yDir = -1
		elsif xDir == -1
			xDir = 0
			yDir = 1
		else
			if yDir == 1
				xDir = 1
				yDir = 0
			else
				xDir = -1
				yDir = 0
			end
		end
	else
		if yDir == 1
			yDir = 0
			xDir = -1
		elsif yDir == -1
			yDir = 0
			xDir = 1
		else
			if xDir == 1
				yDir = 1
				xDir = 0
			else
				yDir = -1
				xDir = 0
			end
		end
	end
	x += xDir * Integer(e)
	y += yDir * Integer(e)
end

# Print the length
puts x.abs + y.abs
