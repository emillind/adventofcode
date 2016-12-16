input = File.read(ARGV[0])
lines = input.lines

sum = 0

lines.each do |e|
	split = e.split('-')
	idAndSum = split.pop() # Pop ID and checksum
	# Join rest, split into chars, group them, map on the char and then sort.
	map = split.join.chars.group_by(&:chr).map{ |k, v| [k, v.size] }.sort_by{ |k, v| [-v,k] }

	# Split the id and checksum
	temp = idAndSum.delete "]"
	idAndSum = temp.split('[')

	checksum = idAndSum[1].chars.slice!(0,5) # The 5 characters in checksum
	compare = map.take(5).collect(&:first) # Top 5 characters in words
	if checksum.eql?(compare)
		sum += Integer(idAndSum[0])
	end
end

puts sum
