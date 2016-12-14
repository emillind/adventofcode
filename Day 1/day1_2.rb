# Read input file and split each movement into an array
input = File.read(ARGV[0])
array = input.split(', ')

# Struct for keeping track of where i have been
Coord = Struct.new(:x, :y)
start = Coord.new(0, 0)

# Positions in X and Y
x = 0
y = 0

# Facing direction in X and Y
xDir = 0
yDir = 1

coordinates = Array.new()
coordinates.push(start)

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

	for i in 1..(Integer(e))
		newCoord = Coord.new((x+(i*xDir)), (y+(i*yDir)))
		if coordinates.include?(newCoord)
			puts newCoord.x.abs + newCoord.y.abs
			exit
		else
			coordinates.push(newCoord)
		end
	end
	x = newCoord.x
	y = newCoord.y
end
