input = File.read(ARGV[0])
lines = input.lines

sum = 0

lines.each do |e|
	split = e.split('-')
	# Pop ID and checksum
	idAndSum = split.pop()
	# Join rest, split into chars, group them, map on the char and then sort.
	map = split.join.chars.group_by(&:chr).map{ |k, v| [k, v.size] }.sort_by{ |k, v| [-v,k] }
	# Split the id and checksum
	temp = idAndSum.delete "]"
	idAndSum = temp.split('[')
	checksum = idAndSum[1].chars
	# Compare checksum with first 5 keys in map
end

puts sum
