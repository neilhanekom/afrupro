describe('v-pane-header directive', function () {

  var $compile;
  var $rootScope;
  var accordionConfig;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-accordion>\n';
        template += '<v-pane>\n';
        template += '<v-pane-header>' + dafaults.transcludedContent + '</v-pane-header>\n';
        template += '<v-pane-content></v-pane-content>\n';
        template += '</v-pane>\n';
        template += '</v-accordion>';

    return template;
  };



  beforeEach(module('vAccordion'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _accordionConfig_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    accordionConfig = _accordionConfig_;
  }));

  afterEach(function () {
    scope.$destroy();
  });
  


  it('should throw an error if `v-pane` directive controller can\'t be found', function () {
    var template = '<v-pane-header></v-pane-header>';

    expect(function () { $compile(template)(scope); }).toThrow();
  });


  it('should transclude scope and add inner `div` wrapper', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });

    var accordion = $compile(template)(scope);
    var paneHeader = accordion.find('v-pane-header');

    scope.message = message;
    scope.$digest();

    expect(paneHeader.html()).toContain(message);
    expect(paneHeader.html()).toContain('</div>');
  });


  it('should toggle the pane on click', function () {
    var template =  generateTemplate();

    var accordion = $compile(template)(scope);
    var pane = accordion.find('v-pane');
    var paneHeader = accordion.find('v-pane-header');

    var paneIsolateScope = pane.isolateScope();

    expect(paneIsolateScope.isExpanded).toBe(false);
    paneHeader.click();
    expect(paneIsolateScope.isExpanded).toBe(true);
    paneHeader.click();
    expect(paneIsolateScope.isExpanded).toBe(false);
  });

});