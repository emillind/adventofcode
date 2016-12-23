input = File.read(ARGV[0])
lines = input.lines

count = 0

def hasBAB (inside, string)
	inside.each { |e|
		if e.include?(string)
			return true
		end
	}
	return false
end

def isSSL (outside, inside)
	outside.each { |e|
		aba = e.match('(\w)(\w)\1')
		if aba
			aba = aba.to_s
			if hasBAB(inside, [aba[1], aba[0], aba[1]].join)
				return true
			end
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
	if isSSL(outside, inside)
		count += 1
	end
}

puts count
