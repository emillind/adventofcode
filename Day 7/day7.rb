input = File.read(ARGV[0])
lines = input.lines

count = 0

def hasABBA (list)
	list.each { |e|
		if e.match('(\w)(\w)\2\1') && !e.match('(\w)\1\1\1')
			return true
		end
	}
	return false
end

lines.each { |e|
	temp = e.split('[')
	outside = [temp[0]]
	inside = []
	for i in 1..(temp.length-1)
		split = temp[i].split(']')
		outside.push(split[1])
		inside.push(split[0])
	end
	if !hasABBA(inside)
		if hasABBA(outside)
			count += 1
		end
	end
}

puts count
