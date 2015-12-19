
var engine = require('..').engine;

exports['create engine'] = function (test) {
    var eng = engine({ name: 'engine1', title: 'Engine 1' });
    
    test.ok(eng);
    test.equal(eng.name, 'engine1');
    test.equal(eng.title, 'Engine 1');
}

exports['add rule'] = function (test) {
    var eng = engine({});
    
    var rule = eng.rule({ name: 'rule1', title: 'Rule 1' });
    
    test.ok(rule);
    test.equal(rule.name, 'rule1');
    test.equal(rule.title, 'Rule 1');
}

exports['add and run rule on model'] = function (test) {
    var model = { temperature: 37 };
    
    var eng = engine({});
    
    eng.rule({ name: 'rule1', title: 'Rule 1' })
        .when("model.temperature == 37")
        .then("model.hasFever = true");
        
    eng.run(model);
    
    test.equal(model.temperature, 37);
    test.equal(model.hasFever, true);
}

exports['two rules and run on model'] = function (test) {
    var model = { temperature: 40 };
    
    var eng = engine({});
    
    eng.rule({ name: 'rule1', title: 'Rule 1' })
        .when("model.hasFever == true")
        .then("model.inBed = true");
        
    eng.rule({ name: 'rule2', title: 'Rule 2' })
        .when("model.temperature >= 37")
        .then("model.hasFever = true");
        
    eng.run(model);
    
    test.equal(model.temperature, 40);
    test.equal(model.hasFever, true);
    test.equal(model.inBed, true);
}

