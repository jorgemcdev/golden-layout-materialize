var config = {
    content: [{
        type: 'row',
        content:[{
            type: 'component',
            componentName: 'testComponent',
            componentState: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'B' }
            },{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'C' }
            }]
        }]
    }]
};

var myLayout, savedState = localStorage.getItem( 'savedState' );

if( savedState !== null ) {
    myLayout = new GoldenLayout( JSON.parse( savedState ) );
} else {
    myLayout = new GoldenLayout( config );
}

myLayout.on( 'stateChanged', function(){
    var state = JSON.stringify( myLayout.toConfig() );
    localStorage.setItem( 'savedState', state );
});


myLayout.registerComponent( 'testComponent', function( container, state ){

    // Create the input
    var input = $( '<input type="text" />' );

    // Set the initial / saved state
    if( state.label ) {
        input.val( state.label );
    }

    // Store state updates
    input.on( 'change', function(){
        container.extendState({
            label: input.val()
        });
    });

    // Append it to the DOM
    container.getElement().append( input );
});

myLayout.init();
