// Start with a webdriver instance:
var sw = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
var driver = new sw.Builder()
    .withCapabilities(sw.Capabilities.chrome())
    .build()

// And then...
var chai = require('chai')
    , chaiHttp = require('chai-http')
    , should = chai.should();
var chaiWebdriver = require('chai-webdriver');
var chaiaspromise = require('chai-as-promised')
chai.use(chaiWebdriver(driver));
chai.use(chaiaspromise)

const assert = require('chai').assert
var expect  = require("chai").expect;
var request = require("request");
var userController = require("../controllers/userController")
var app = require("../app")

chai.use(chaiHttp);


describe('App',function (){
    describe('load default page',function (){
        var url = "http://localhost:3000";
        it('user default page, url = http://localhost:3000, res status is "401" if success', function (done) {
            request(url,function (err,res,body){
                expect(res.statusCode).to.equal(200);
                done();
            })
        });
    })

    describe('load user main',function (){
        var url = "http://localhost:3000/user-eportfolio";
        it('user main page, url = http://localhost:3000/user-eportfolio, res status 401 ', function (done) {
            request(url,function (err,res,body){
                expect(res.statusCode).to.equal(401);
                done();
            })
        });
    })

    describe('load user cloud page',function (){
        var url = "http://localhost:3000/file/main";
        it('user cloud page, url = http://localhost:3000/file/main, res status 401 ', function (done) {
            request(url,function (err,res,body){
                expect(res.statusCode).to.equal(401);
                done();
            })
        });
    })

    describe('GET /user-eportfolio', () => {
        it('try to read user eportfolio without login, if return error means success', done => {
            chai
                .request(app)
                .get('/user-eportfolio')
                .end((err, res) => {
                    res.should.have.status(401);
                    expect(res.body.error).to.deep.equal('You must log in!' );
                    done();
                });
        });
    });

    describe('test visitor main page', function () {

        beforeEach(function (){
            driver.get('http://localhost:3000')
        })

        afterEach(function (){
            driver.quit()
        })

        it('test visitor page nav bar',function (){
            var search = driver.findElement(sw.By.name('q'))
            search.sendKeys('lillian')
            search.getAttribute('value').then(function (value){
                assert.equal(value,'lillian')
            })

        })

    });

    describe('unit test controller function',function (){
        it('find index of project in projects array', function () {
            assert.equal(userController.indexOfProject({
                project: [
                    {
                        fileInfo: [Array],
                        comments: [Array],
                        textboxs: [Array],
                        _id: 1,
                        projectName: 'COMP30022 IT Project ePortfolio',
                        projectDesc: 'Project README',
                        projectTheme: 1
                    },
                    {
                        fileInfo: [Array],
                        comments: [],
                        textboxs: [],
                        _id: 2,
                        projectName: 'build a plane',
                        projectDesc: 'Tang wants to build a plane',
                        projectTheme: 1
                    }
                ]
            },"1"
        ),"0")
        });
    })
})