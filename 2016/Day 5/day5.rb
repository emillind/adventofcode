require 'digest'

input = File.read(ARGV[0]).chomp!()
ans = ''
i = 0

def getHash (string)
	return Digest::MD5.hexdigest(string)
end

while ans.length < 8
	hash = getHash(input + i.to_s)
	if hash[0..4] == '00000'
		puts i
		ans.concat(hash[5])
	end
	i += 1
end

puts ans
