/**
 * Created by linxiaojie on 2016/2/25.
 *
 * Example:
 * render("{greeting}! {name}", {greeting: 'Hi', name: 'liljay'})
 * //Hi! liljay
 *
 */
(function(){
    String.prototype.render = function(context){
        return render(this, context);
    }
    function render(template, context){
        var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
        return template.replace(tokenReg, function(word, slash1, token, slash2){
            if(slash1 || slash2){
                return word.replace('\\', '');
            }
            var variables = token.replace(/\s/g, '').split('.');
            var currentObject = context;
            var i, length, variable;
            for(i = 0, length = variables.length; i < length; i++){
                variable = variables[i];
                currentObject = currentObject[variable];
                if(currentObject === undefined || currentObject === null) return '';
            }
            return currentObject;
        })
    }
})();
