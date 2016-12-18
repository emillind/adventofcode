input = File.read(ARGV[0])
lines = input.lines

ans = ''
# Map each line to chars, transpose the array and join each new line.
transpose = lines.each { |e| e.chomp!() }.map(&:chars).transpose.map { |e| e.join }

transpose.each { |t|
	# Split into char array, group them, map them and sort them.
	map = t.chars.group_by(&:chr).map { |k, v| [k, v.size] }.sort_by{ |k, v| [-v,k] }
	ans.concat(map.pop[0])
}

puts ans
