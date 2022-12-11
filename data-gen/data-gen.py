import sqlite3

DATABASE = 'data-gen/mcpdict.db'

conn = sqlite3.connect(DATABASE)

cursor = conn.cursor()

LARGE_FROM_PATH = 'data-gen/常用字字形表.txt'
LARGE_TO_PATH = 'public/data/data_large.tsv'

with open(LARGE_FROM_PATH, 'r', encoding='utf8') as reader:
    with open(LARGE_TO_PATH, 'w', encoding='utf8') as writer:
        next(reader)
        next(reader)
        for line in reader.readlines():
            han = line.split()[0]

            # unicode encoding as it is how the DB stores chars
            unicode_str = han.encode('unicode_escape')
            unicode_str = str(unicode_str)
            unicode_str = unicode_str[5:-1].upper()

            cursor.execute('SELECT ct FROM mcpdict WHERE unicode = ?', (unicode_str,))
            try:
                roma = str(cursor.fetchall()[0][0])
            except IndexError:
                continue
            if roma is None or roma == 'None':
                continue
            writer.write(f'{han}\t{roma}\n')

