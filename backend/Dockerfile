FROM python:3.9.13

WORKDIR /dvstr

# to be cached  #
COPY ./requirements.txt .
RUN pip install -r requirements.txt
# # # # # # # # #

COPY . .

RUN python manage.py migrate

RUN python loaddata fixtures.json
