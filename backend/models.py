from exts import db
from flask import abort

class Recipe(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title} >"
    

    @classmethod
    def get_by_id(cls, id):
        return db.session.get(cls, id)

    @classmethod
    def get_or_404(cls, id):
        instance = cls.get_by_id(id)
        if instance is None:
            abort(404, description=f"{cls.__name__} with id {id} not found")
        return instance

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, title, description):  
        self.title = title
        self.description = description
        db.session.commit()

# user model 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        """
        returns string rep of object
 
        """
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()