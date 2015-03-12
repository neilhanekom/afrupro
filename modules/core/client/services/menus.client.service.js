'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

    function() {
        // Define a set of default roles
        this.defaultRoles = ['*'];

        // Define the menus object
        this.menus = {};

        // A private function for rendering decision 
        var shouldRender = function(user) {
            // we bring in the authentication service user object

            // we test if user exists
            if (user) {
                // We check the index of roles that exist in addMenu, addMenuItem, addSubMenuItem
                if (!!~this.roles.indexOf('*')) {
                    return true;
                } else {
                    for (var userRoleIndex in user.roles) {
                        for (var roleIndex in this.roles) {
                            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                                return true;
                            }
                        }
                    }
                }
            } else {
                return this.isPublic;
            }

            return false;
        };

        // Validate menu existance
        this.validateMenuExistance = function(menuId) {
            if (menuId && menuId.length) {
                if (this.menus[menuId]) {
                    return true;
                } else {
                    throw new Error('Menu does not exists');
                }
            } else {
                throw new Error('MenuId was not provided');
            }

            return false;
        };

        // Get the menu object by menu id
        this.getMenu = function(menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            return this.menus[menuId];
        };

        // Add new menu object by menu id
        this.addMenu = function(menuId, options) {
            options = options || {};

            // Create the new menu
            this.menus[menuId] = {
                isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? true : options.isPublic),
                roles: options.roles,
                items: options.items || [],
                shouldRender: shouldRender
            };

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenu = function(menuId) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Return the menu object
            delete this.menus[menuId];
        };

        // Add menu item object
        this.addMenuItem = function(menuId, options) {
            options = options || {};

            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Push new menu item
            this.menus[menuId].items.push({
                icon: options.icon,
                title: options.title || '',
                state: options.state || '',
                type: options.type || 'item',
                class: options.class,
                isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.menus[menuId].isPublic : options.isPublic),
                roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].roles : options.roles),
                position: options.position || 0,
                items: [],
                shouldRender: shouldRender
            });

            // Add submenu items
            if (options.items) {
                for (var i in options.items) {
                    this.addSubMenuItem(menuId, options.link, options.items[i]);
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Add submenu item object
        this.addSubMenuItem = function(menuId, parentItemState, options) {
            options = options || {};

            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].state === parentItemState) {
                    // Push new submenu item
                    this.menus[menuId].items[itemIndex].items.push({
                        title: options.title || '',
                        state: options.state|| '',
                        isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : options.isPublic),
                        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
                        position: options.position || 0,
                        shouldRender: shouldRender
                    });
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeMenuItem = function(menuId, menuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
                    this.menus[menuId].items.splice(itemIndex, 1);
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        // Remove existing menu object by menu id
        this.removeSubMenuItem = function(menuId, submenuItemURL) {
            // Validate that the menu exists
            this.validateMenuExistance(menuId);

            // Search for menu item to remove
            for (var itemIndex in this.menus[menuId].items) {
                for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
                    if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
                        this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
                    }
                }
            }

            // Return the menu object
            return this.menus[menuId];
        };

        

        //Adding the topbar menu
        this.addMenu('topbar', {
            isPublic: false
        });

        this.addMenu('sidenav', {
            isPublic: false,
            roles: ['user' , 'admin' ]

        });

        //   ===========    Messages   ===========

        this.addMenuItem('sidenav', {
            icon: 'messages',
            title: 'Messages',
            state: 'messages',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 0,
        });

        this.addSubMenuItem('sidenav', 'messages', {
            title: 'Inbox',
            state: 'inbox',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 0
        });

        this.addSubMenuItem('sidenav', 'messages', {
            title: 'Sent',
            state: 'sent',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 1
        });

        //   ===========  Notifications ===========

        this.addMenuItem('sidenav', {
            icon: 'notifications',
            title: 'Notifications',
            state: 'notifications',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 1,
        });

        //   ===========  My Course for Students only ===========

        this.addMenuItem('sidenav', {
            icon: 'location',
            title: 'Site',
            state: 'site',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 2,
        });

        this.addSubMenuItem('sidenav', 'site', {
            title: 'background',
            state: 'background',
            isPublic: false,
            roles: ['user'],
            position: 0
        });

        this.addSubMenuItem('sidenav', 'site', {
            title: 'Ownership',
            state: 'ownership',
            isPublic: false,
            roles: ['user'],
            position: 1
        });


        this.addSubMenuItem('sidenav', 'site', {
            title: 'Maps',
            state: 'map',
            isPublic: false,
            roles: ['user'],
            position: 2
        });

        this.addSubMenuItem('sidenav', 'site', {
            title: 'Conservation',
            state: 'conservation',
            isPublic: false,
            roles: ['user'],
            position: 3
        });

        //   ===========  Input  ===========

        this.addMenuItem('sidenav', {
            icon: 'input',
            title: 'Input',
            state: 'input',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 3,
        });

        this.addSubMenuItem('sidenav', 'input', {
            title: 'Chemical',
            state: 'chemicals',
            isPublic: false,
            roles: ['user'],
            position: 0
        });

        this.addSubMenuItem('sidenav', 'input', {
            title: 'Fertilizer',
            state: 'fertilizers',
            isPublic: false,
            roles: ['user'],
            position: 1
        });
        this.addSubMenuItem('sidenav', 'input', {
            title: 'Electricity',
            state: 'electricities',
            isPublic: false,
            roles: ['user'],
            position: 2
        });
        this.addSubMenuItem('sidenav', 'input', {
            title: 'Water',
            state: 'waters',
            isPublic: false,
            roles: ['user'],
            position: 3
        });
        this.addSubMenuItem('sidenav', 'input', {
            title: 'Plant Material',
            state: 'pmaterials',
            isPublic: false,
            roles: ['user'],
            position: 4
        });
        this.addSubMenuItem('sidenav', 'input', {
            title: 'Subcontractors',
            state: 'subcontractors',
            isPublic: false,
            roles: ['user'],
            position: 5
        });
        //   ===========  Branches  ===========

        this.addMenuItem('sidenav', {
            icon: 'output',
            title: 'Output',
            state: 'output',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin' ],
            position: 4,
        });

        this.addSubMenuItem('sidenav', 'output', {
            title: 'Avo',
            state: 'avos',
            isPublic: false,
            roles: ['user'],
            position: 0
        });
        this.addSubMenuItem('sidenav', 'output', {
            title: 'Macadamia',
            state: 'macadamias',
            isPublic: false,
            roles: ['user'],
            position: 1
        });
        this.addSubMenuItem('sidenav', 'output', {
            title: 'Pollution',
            state: 'pollutions',
            isPublic: false,
            roles: ['user'],
            position: 2
        });
        this.addSubMenuItem('sidenav', 'output', {
            title: 'Waste',
            state: 'waste',
            isPublic: false,
            roles: ['user'],
            position: 3
        });


        //   ===========  Payments ===========

        this.addMenuItem('sidenav', {
            icon: 'people',
            title: 'People',
            state: 'people',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 5,
        });

        this.addSubMenuItem('sidenav', 'people', {
            title: 'Healt & Safety',
            state: 'healtsafety',
            isPublic: false,
            roles: ['user'],
            position: 0
        });
        this.addSubMenuItem('sidenav', 'people', {
            title: 'Training $ Development',
            state: 'trainingdevelopment',
            isPublic: false,
            roles: ['user'],
            position: 1
        });
        this.addSubMenuItem('sidenav', 'people', {
            title: 'Employment',
            state: 'employment',
            isPublic: false,
            roles: ['user'],
            position: 2
        });
        this.addSubMenuItem('sidenav', 'people', {
            title: 'Employment Equity',
            state: 'employmentequity',
            isPublic: false,
            roles: ['user'],
            position: 3
        });
        this.addSubMenuItem('sidenav', 'people', {
            title: 'Housing',
            state: 'housing',
            isPublic: false,
            roles: ['user'],
            position: 4
        });
        this.addSubMenuItem('sidenav', 'people', {
            title: 'Skill/Seta',
            state: 'skils',
            isPublic: false,
            roles: ['user'],
            position: 5
        });


        // ====================================

        

        this.addMenuItem('sidenav', {
            icon: 'assets',
            title: 'Assets & Things',
            state: 'things',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 6,
        });

        this.addSubMenuItem('sidenav', 'things', {
            title: 'Vehicles',
            state: 'vehicles',
            isPublic: false,
            roles: ['user'],
            position: 0
        });

        this.addSubMenuItem('sidenav', 'things', {
            title: 'Equipment',
            state: 'equipment',
            isPublic: false,
            roles: ['user'],
            position: 1
        });

        // =================================== 

        this.addMenuItem('sidenav', {
            icon: 'money',
            title: 'Financial',
            state: 'financial',
            class: 'sidenav-icon',
            isPublic: false,
            roles: ['user' , 'admin'],
            position: 8,
        });

        this.addSubMenuItem('sidenav', 'financial', {
            title: 'Budgets',
            state: 'budgets',
            isPublic: false,
            roles: ['user'],
            position: 0
        });

        this.addSubMenuItem('sidenav', 'financial', {
            title: 'VAT',
            state: 'vat',
            isPublic: false,
            roles: ['user'],
            position: 1
        });

        this.addSubMenuItem('sidenav', 'financial', {
            title: 'Debtors',
            state: 'debtors',
            isPublic: false,
            roles: ['user'],
            position: 2
        });

        this.addSubMenuItem('sidenav', 'financial', {
            title: 'Creditors',
            state: 'creditors',
            isPublic: false,
            roles: ['user'],
            position: 3
        });

        // =====================================

        this.addMenuItem('sidenav', {
            icon: 'admin',
            title: 'Admin',
            state: 'admin',
            class: 'sidenav-icon',
            isPublic: false,
            roles: [ 'user' , 'admin' ],
            position: 9,
        });

        this.addSubMenuItem('sidenav', 'admin', {
            title: 'Meetings',
            state: 'meetings',
            isPublic: false,
            roles: ['user'],
            position: 0
        });
        this.addSubMenuItem('sidenav', 'admin', {
            title: 'Company Docs',
            state: 'compantdocs',
            isPublic: false,
            roles: ['user'],
            position: 1
        });

        // =================== Users ================
        this.addMenuItem('sidenav', {
            icon: 'users',
            title: 'Users',
            state: 'users.list',
            class: 'sidenav-icon',
            isPublic: false,
            roles: [ 'admin' ],
            position: 10,
        });
        
        // =================== Users ================
        this.addMenuItem('sidenav', {
            icon: 'guest',
            title: 'Guests',
            state: 'guests.list',
            class: 'sidenav-icon',
            isPublic: false,
            roles: [ 'admin' ],
            position: 11,
        });

        // =================== Users ================
        this.addMenuItem('sidenav', {
            icon: 'administrator',
            title: 'Admins',
            state: 'admins.list',
            class: 'sidenav-icon',
            isPublic: false,
            roles: [ 'admin' ],
            position: 12,
        });
        



        // ======================================================================== End of all main Items ===================================================


        // ======================================================================== Sub-Items ===================================================



    }
]);
