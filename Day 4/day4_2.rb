input = File.read(ARGV[0])
lines = input.lines

$alphabet = ('a'..'z').to_a

def decipher (word, id)
	ans = ''
	movement = id % $alphabet.length
	word.each { |w|
		wordBuilder = ''
		w.chars.each { |c|
			wordBuilder.concat($alphabet[((movement + $alphabet.index(c)) % $alphabet.length)])
		}
		ans.concat(' ' + wordBuilder)
	}
	return ans
end

lines.each do |e|
	split = e.split('-')

	id = Integer(split.pop().split('[')[0])

	word = decipher(split, id)
	if word.strip.eql?('northpole object storage')
		puts id
	end
end
