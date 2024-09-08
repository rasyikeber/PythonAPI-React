from flask_restx import Namespace, Resource, fields,marshal
from models import Recipe
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask import request


recipe_ns = Namespace("recipe", description="A namespace for Recipes")

recipe_model = recipe_ns.model('Recipe', {
    'id': fields.Integer(description='Recipe ID'),  # Add this line for the ID
    'title': fields.String(required=True, description='Recipe title'),
    'description': fields.String(required=True, description='Recipe description')
})


@recipe_ns.route('/recipes')
class RecipesResource(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        """get all recipes"""
        recipes = Recipe.query.all()
        # for recp in recipes:
        #     print(recp.id, recp.title)
        return recipes

    @jwt_required()
    @recipe_ns.expect(recipe_model)
    def post(self):
        """Create a new recipe"""
        # Get the identity of the token holder (optional but useful)
        current_user = get_jwt_identity()
        print(f'Authenticated user: {current_user}')
        
        data = request.get_json()
        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )
        
        try:
            new_recipe.save()  # Save the new recipe to the database
            
            # Manually marshal the new_recipe object
            recipe_data = marshal(new_recipe, recipe_model)
            
            # Return success message and marshaled recipe data
            return {
                'message': 'Recipe created successfully!',
                'recipe': recipe_data
            }, 201
        except Exception as e:
            return {'message': 'Failed to create recipe.', 'error': str(e)}, 500



@recipe_ns.route('/recipe/<int:id>')
class RecipeResource(Resource):
    @recipe_ns.marshal_with(recipe_model)
    def get(self, id):
        """get recipe by id"""
        recipe= Recipe.get_or_404(id)
        return recipe


    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def put(self, id):
        """update a recipe by id"""
        recipe_to_update = Recipe.get_or_404(id)
        print("the recipe to update",recipe_to_update)
        data = request.get_json()
        recipe_to_update.update(data.get('title'), data.get('description'))
        return recipe_to_update


    # @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def delete(self, id):
        """delete a recipe by id"""
        recipe_to_delete = Recipe.get_or_404(id)
        print("the recipe to delete", recipe_to_delete)
        
        try:
            recipe_to_delete.delete()  # Delete the recipe from the database
            return {'message': 'Recipe deleted successfully!'}, 200  # Success response with 200 status
        except Exception as e:
            return {'message': 'Failed to delete recipe.', 'error': str(e)}, 500  # Handle errors

 