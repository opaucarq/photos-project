class PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]

  # GET /posts
  def index
    posts = Post.all
    posts_with_hola = posts.map do |post|
      post.as_json(include: :images).merge(images: post.images.map do |image|
        url_for(image)
      end)
    end

    render json: posts_with_hola
  end

  # GET /posts/1
  def show
    render json: @post.as_json(include: :images).merge(
      images: @post.images.map do |image|
        url_for(image)
      end
    )
  end

  # POST /posts
  def create
    @post = Post.new(post_params.except(:images))
    images = params[:post][:images]

    if images
      images.each do |image|
        @post.images.attach(image)
      end
    end

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    # params.fetch(:post, {})
    params.require(:post).permit(images: [])
  end
end
