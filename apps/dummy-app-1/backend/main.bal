import ballerina/http;

type CalculateRequest record {|
    float a;
    float b;
    string op;
|};

service / on new http:Listener(4001) {
    resource function get health() returns json {
        return {status: "ok", app: "dummy-app-1-backend"};
    }

    resource function post api/calculate(@http:Payload CalculateRequest payload) returns json {
        float a = payload.a;
        float b = payload.b;
        string op = payload.op;

        if op == "+" {
            return {result: a + b};
        }
        if op == "-" {
            return {result: a - b};
        }
        if op == "*" {
            return {result: a * b};
        }
        if op == "/" {
            if b == 0.0 {
                return {'error: "division by zero"};
            }
            return {result: a / b};
        }

        return {'error: "unsupported operator"};
    }
}