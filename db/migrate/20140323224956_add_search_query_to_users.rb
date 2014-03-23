class AddSearchQueryToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :search_query, :string
  end
end
