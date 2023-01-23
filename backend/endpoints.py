import os
import mariadb
import sqlalchemy
from sqlalchemy import update
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_serializer import SerializerMixin

from dataclasses import dataclass
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Api
from flask_marshmallow import Marshmallow

app = Flask(__name__)
ma = Marshmallow(app)
cors = CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
Base = declarative_base()


def prepare_error_response(message):
    return {'status_code': 500, 'message': message}


def prepare_success_response(message=None, data=None):
    return {'status_code': 200, 'message': message, 'data': data}


def create_database_connection():
    engine = sqlalchemy.create_engine(
        "mariadb+mariadbconnector://{}:{}@{}:{}/{}".format(
            os.getenv("MYSQL_USER"),
            os.getenv("MYSQL_PASSWORD"),
            os.getenv("MYSQL_HOST"),
            os.getenv("MYSQL_PORT"),
            os.getenv("MYSQL_DATABASE")
        ))
    Base.metadata.create_all(engine)
    session = sqlalchemy.orm.sessionmaker()
    session.configure(bind=engine)
    session = session()
    return session


"""
    Start of Datasheets API
"""


@dataclass
class Datasheets(Base, SerializerMixin):
    __tablename__ = 'datasheets'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    keycloak_id = sqlalchemy.Column(sqlalchemy.String(length=100))
    datasheet = sqlalchemy.Column(sqlalchemy.JSON())


class DatasheetsSchema(ma.Schema):
    class Meta:
        fields = ("id", "keycloak_id", "datasheet")


datasheet_schema = DatasheetsSchema()
datasheet_schema = DatasheetsSchema(many=True)


@app.route("/datasheets", methods=['GET'])
@cross_origin()
def return_all_datasheets():
    try:
        session = create_database_connection()
        if request.args:
            keycloak_id = request.args.get('keycloak_id')
            if keycloak_id:
                # return all datasheets, filter by keycloak_id
                result = session.query(Datasheets).filter(Datasheets.keycloak_id == keycloak_id)
        if request.args:
            datasheet_id = request.args.get('datasheet_id')
            if datasheet_id:
                # return single datasheet, filter by datasheet_id
                result = session.query(Datasheets).filter(Datasheets.id == int(datasheet_id))
        else:
            # return all datasheets
            result = session.query(Datasheets).all()
        return prepare_success_response(data=datasheet_schema.dump(datasheet_schema.dump(result)))
    except mariadb.Error:
        return prepare_error_response('Failed to search.')


@app.route("/datasheets", methods=['POST'])
@cross_origin()
def insert_new_datasheet():
    try:
        data = request.get_json()
        keycloak_id = data['keycloak_id']
        session = create_database_connection()
        insert_data = Datasheets(keycloak_id=keycloak_id, datasheet=data)
        session.add(insert_data)
        session.commit()
        return prepare_success_response(message="Successfully created a new datasheet")
    except mariadb.Error:
        return prepare_error_response('Failed to submit datasheet.')


@app.route("/datasheets", methods=['PUT'])
@cross_origin()
def update_existing_datasheet():
    try:
        data = request.get_json()
        datasheet_id = data['datasheet_id']
        session = create_database_connection()
        query = (update(Datasheets).where(Datasheets.id == datasheet_id).values(datasheet=data))
        session.execute(query)
        session.commit()
        return prepare_success_response(message="Successfully updated the datasheet")
    except mariadb.Error:
        return prepare_error_response('Failed to submit datasheet.')

"""
    End of Datasheet API
"""

"""
    Start of Customer API
"""


@dataclass
class Customers(Base, SerializerMixin):
    __tablename__ = 'customers'
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    keycloak_id = sqlalchemy.Column(sqlalchemy.String(length=100))


class CustomersSchema(ma.Schema):
    class Meta:
        fields = ("id", "keycloak_id")


customer_schema = CustomersSchema()
customer_schema = CustomersSchema(many=True)


@app.route("/customer", methods=['GET'])
@cross_origin()
def return_all_customers():
    try:
        session = create_database_connection()
        results = session.query(Customers).all()
        return prepare_success_response(data=customer_schema.dump(results))
    except mariadb.Error:
        return prepare_error_response('Failed to return customers.')


@app.route("/customer", methods=['POST'])
@cross_origin()
def insert_new_customer():
    try:
        data = request.get_json()
        keycloak_id = data['keycloak_id']
        session = create_database_connection()
        customer = Customers(keycloak_id=keycloak_id)
        session.add(customer)
        session.commit()
        return prepare_success_response(message="Successfully created a new customer")
    except mariadb.Error:
        return prepare_error_response('Failed.')


"""
    End of Customer API 
"""

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
