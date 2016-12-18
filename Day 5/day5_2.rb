require 'digest'

input = File.read(ARGV[0]).chomp!()
ans = '________'.chars
i = 0

def getHash (string)
	return Digest::MD5.hexdigest(string)
end

# Needed because a-f converts to 0
def getNum (string)
	if string.to_i == 0
		if string.eql?('0')
			return 0
		else
			return 10
		end
	end
	return string.to_i
end

while ans.include?('_')
	hash = getHash(input + i.to_s)
	if hash[0..4] == '00000' && getNum(hash[5]) < ans.length && ans[hash[5].to_i] == '_' # Apparently not supposed to overwrite characters
		ans[hash[5].to_i] = hash[6]
		puts ans.join("")
	end
	i += 1
end

puts ans
