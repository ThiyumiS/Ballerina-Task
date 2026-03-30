import ballerina/http;

type CountWordsRequest record {|
    string sentence;
|};

service / on new http:Listener(4002) {
    resource function get health() returns json {
        return {status: "ok", app: "dummy-app-2-backend"};
    }

    resource function post api/countWords(@http:Payload CountWordsRequest payload) returns json {
        string sentence = payload.sentence.trim();
        if sentence.length() == 0 {
            return {words: 0};
        }

        int count = 0;
        boolean inWord = false;
        foreach int cp in sentence.toCodePointInts() {
            boolean isWhitespace = cp == 32 || cp == 9 || cp == 10 || cp == 13;
            if isWhitespace {
                inWord = false;
            } else if !inWord {
                count += 1;
                inWord = true;
            }
        }

        return {words: count};
    }
}